# DB Schema

## auth.users

```sql
id UUID PK
email TEXT
-- a bunch of other fields we dont immediately care about...
```

## profiles

```sql
id UUID PK FK -- ref auth.users.id
username TEXT
display_name TEXT
image_url TEXT -- A profile picture. Could add this feature in the future. Can just be null in db for now
```

## jeopardies

One user can have many jeopardies
One jeopardy can be copied from one jeopardy

```sql
id INT PK
user_id UUID FK -- ref auth.users.id... or profiles.id? The person who created the Jeopardy
copied_from INT FK -- ref jeopardies.id, this table. Null if this Jeopardy was created from scratch.
title TEXT
description TEXT
public BOOLEAN DEFAULT TRUE
in_progress BOOLEAN DEFAULT TRUE -- if in_progress is true, the game will not be playable yet as the author is still creating the game
play_count INT 
image_url TEXT -- A profile picture. Could add this feature in the future. Can just be null in db for now

-- timestamps
created_at DATETIME DEFAULT NOW()
updated_at DATETIME DEFAULT NOW()
```

## rounds

One jeopardy can have many rounds

```sql
id INT PK
jeopardy_id INT FK -- ref jeopardies.id
ordinal INT -- when we fetch a Jeopardy's rounds, order by this
board JSONB
```

```json
// Example of the JSON we could store in the board field of the rounds table above
// A board is made up of an array of categories, which is made up of an array of cells
// just assuming rows will always start at $200 and increment by $200 for now
{
    "categories": [
        {
            "category": "Sports",
            "cells": [
                { "question": "Question Text", "answer": "Answer Text", "isDailyDouble": false },
                { "question": "Question Text", "answer": "Answer Text", "isDailyDouble": false },
                { "question": "Question Text", "answer": "Answer Text", "isDailyDouble": false },
                { "question": "Question Text", "answer": "Answer Text", "isDailyDouble": false },
                { "question": "Question Text", "answer": "Answer Text", "isDailyDouble": false },
            ]
        },
        // example if user has not completed all cells in a category yet
        // this type of data we would only allow when the `in_progress` boolean of the jeopardies table is set to true
        {
            "category": "Movies",
            "cells": [
                null,
                { "question": null, "answer": "Forrest Gump", "isDailyDouble": false },
                null
                { "question": "Question Text", "answer": null, "isDailyDouble": false },
            ]
        }
    ]
}
```