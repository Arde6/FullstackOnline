```mermaid
sequenceDiagram
    participant browser
    participant user
    participant server

    user-->>browser: type text to textfield
    user-->>browser: click save
    activate browser
    browser-->>server: POST /new_note
    activate server
    server-->>browser: GET notes
    server-->>browser: GET main.css
    server-->>browser: GET main.js
    server-->>browser: GET data.json
```