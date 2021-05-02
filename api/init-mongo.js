db.createUser({
    user: "dndtoolsadmin",
    pwd: "58dndtoolsadmin12",
    roles: [
        {
            role: "readWrite",
            db: "dnd-tools"
        }
    ]
})