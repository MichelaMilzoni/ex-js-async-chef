//* logica
// faccio una prima chiamata per ottenere la ricetta tramite l'id e gestisco l'errore
// dalla ricetta cercata estraggo l'userId che collega lo chef a quella ricetta e gestisco l'errore
// faccio una seconda chiamata per ottenere lo chef tramite l'id trovato nella ricetta e gestisco l'errore

async function getChefBirthday(id) {
    try {
        // Recupero la ricetta
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);

        // Controllo se la risposta è ok
        if (!recipeResponse.ok) {
            throw new Error(`Errore nel recupero della ricetta con id ${id}`);
        }

        // Estraggo il JSON della ricetta
        const recipe = await recipeResponse.json();

        // Verifico la presenza di userId
        const userId = recipe.userId;
        if (!userId) {
            throw new Error(`userId non trovato nella ricetta con id ${id}`);
        }

        // Solo se tutto è andato bene, procedo con la seconda richiesta
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);

        if (!userResponse.ok) {
            throw new Error(`Errore nel recupero dello chef con userId ${userId}`);
        }

        const user = await userResponse.json();

        // Ritorno la data di nascita dello chef formattata con dayjs
        const formattedDate = dayjs(user.birthDate).format('DD/MM/YYYY');
        console.log("Data di nascita formattata:", formattedDate);
        return formattedDate;

    } catch (error) {
        console.error("Errore:", error.message);
        throw error; // Propaga l'errore per permettere la gestione esterna
    }
}

getChefBirthday(1)
  .then(birthday => console.log("Data di nascita dello chef:", birthday))
  .catch(error => console.error("Errore:", error.message));
