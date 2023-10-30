document.addEventListener("DOMContentLoaded", () => {

    const groupsList = document.getElementById("groups-list");

    document.getElementById("create-group").addEventListener("click", () => {
        const group = document.createElement("li");
        group.className = "group list-group-item";
        group.innerHTML = `
        <div>
            <input type="text" placeholder="Nome do grupo" class="group-title form-control-dark fs-3">
            <a href="img/shrek.png" target="_blank" class="share-group-link"><img src="img/share-symbol.svg" alt="share-symbol"></a>
        </div>
        <ul class="members-list list-group">
            <!--Generated members will be appended here-->
        </ul>
        <button class="create-member btn btn-dark">Adicionar membro</button>
        `;
        groupsList.appendChild(group);
    });


    let uniqueIdCounter = 0;

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("create-member")) {
            const membersList = event.target.previousElementSibling;
            const member = document.createElement("li");
            member.className = "member container-fluid list-group-item list-group-item-dark p-4 rounded";

            const uniqueId = `new-member-name${uniqueIdCounter}`;
            uniqueIdCounter++;

            member.innerHTML = `
            <form class="new-member container-fluid">
                <div class="row">
                    <label class="col-4 col-sm-3 col-md-2" for="${uniqueId}">Nome: </label>
                    <input class="col-8 col-sm-9 col-md-6" required type="text" id="${uniqueId}" placeholder="Nome do membro">
                    <div class="col-5 col-md-2">
                        <button class="btn btn-danger cancel-form-button" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                            </svg>Cancelar
                        </button>
                    </div>
                    <div class="col-5 col-md-2">
                        <button class="btn btn-success success-form-button" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                            </svg>Confirmar
                        </button>
                    </div>
                </div>
            </form>
            `;
            membersList.appendChild(member);
        }

        else if (event.target.classList.contains("cancel-form-button")) {
            const member = event.target.closest(".member");
            if (member) {
                member.remove();

            }
        }

        else if (event.target.classList.contains("success-form-button")) {
            const groupInput = event.target.closest(".group").querySelector(".group-title");
            const groupName = groupInput.value.trim();
            const memberInput = event.target.closest(".new-member").querySelector("#new-member-name");
            const memberName = memberInput.value.trim();
            
            if (!groupName) {
                alert("You must enter a group name before adding a member.");
                groupInput.style.border = "2px solid red";
            }
            else if (!memberName) {
                alert("You must enter a member name before saving.");
                memberInput.style.border = "2px solid red";
            }
            else {
                groupInput.style.border = "none";
                memberInput.style.border = "none";
            }
            if (groupName && memberName) {
                const groupObject = groupsData.find((group) => group.groupName === "");
                groupObject.groupName = groupName;
                saveGroupsData();

                groupObject = groupsData.find((group) => group.groupName === groupName);
                groupObject.members.push({ memberName });
                saveGroupsData();
            }
        }
    });
});