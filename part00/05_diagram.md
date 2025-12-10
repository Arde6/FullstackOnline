```mermaid
sequenceDiagram
    participant browser
    participant user
    participant server

    activate browser
    user-->>browser: Opens page
    activate server
    server-->>browser: GET spa
    server-->>browser: GET main.css
    server-->>browser: GET spa.js
    server-->>browser: GET data.json
    
```