//* logica
// faccio una prima chiamata per ottenere la ricetta tramite l'id e gestisco l'errore
// dalla ricetta cercata estraggo l'userId che collega lo chef a quella ricetta e gestisco l'errore
// faccio una seconda chiamata per ottenere lo chef tramite l'id trovato nella ricetta e gestisco l'errore


async function getChefBirthday(id) {
    try {
        //recupero la ricetta 
        const recipeResponse = await fetch (`https://dummyjson.com/recipes/${id}`);
        //lancio errore personalizzato se non viene trovato l'ID
        if(!recipeResponse.ok){
            throw new Error(`errore nel recupero della ricetta con id ${id}`)
        };
        //se l'ID viene trovato e la chiamata è ok, recupero il Json
        const recipe = await recipeResponse.json();

        //estraggo l'userId della ricetta
        const userId = recipe.userId;
        if (!userId) {
            throw new Error(`userId non trovato nella ricetta con id ${id}`);
    }

        //recupero le informazioni dello chef
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
        //lancio errore personalizzato se non viene trovato userId
        if(!userResponse.ok){
            throw new Error(`Errore nel recupero dello chef con userId ${userId}`)
        }
        //se userId viene trovato e la chiamata è ok, recupero il Json
        const user = await userResponse.json();

        //ritorno la data di nascita dello chef
        return user.birthDate;
    } catch (error) {
        console.error("Errore:", error.message)
        throw error; // Propaga l'errore per permettere la gestione esterna
    }
};

getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));