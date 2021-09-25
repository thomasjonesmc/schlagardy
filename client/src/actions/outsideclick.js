export function outsideclick(node, params) {

    params = {
        includeChildren: true,
        includeParent: false,
        includeAncestors: false,
        includeSiblings: false,
        ...params
    }

    const { 
        includeAncestors, 
        includeChildren, 
        includeParent,
        includeSiblings
    } = params;


    function mouseDown(e) {

        const isTarget = e.target === node;
        const isParent = includeParent && e.target === node.parentElement;
        const isSibling = includeSiblings && !isTarget && node.parentElement.contains(e.target);
        const isAncestor = includeAncestors && e.target.contains(node);
        const isChild = includeChildren && node.contains(e.target);

        const outside = !(isTarget || isAncestor || isChild || isParent || isSibling);

        if (outside) {
            node.dispatchEvent(new CustomEvent('outsideclick'));
        }
    }

    window.addEventListener('mousedown', mouseDown);

    return {
        destroy() {
            window.removeEventListener('mousedown', mouseDown);
        }
    }
}