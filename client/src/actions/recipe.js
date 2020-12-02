export const getMyRecipe = (viewProfileComp) => {
    const myRecipes = []
    viewProfileComp.user.myRecipes.forEach(rid => {
        const request = new Request(`/api/recipes/${rid}`, {
            method: "get",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
    
        fetch(request)
            .then(res=>{
                if(res.status === 200){
                    return res.json();
                }
            })
            .then(json=>{
                console.log(json)
                myRecipes.push(json)
            })
            .catch(error=>{
                console.log(error);
            })
        
    });
    viewProfileComp.setState({recipes: myRecipes})  
}

export const getMyCollection = (viewProfileComp) => {
    const myCollectedRecipes = []
    viewProfileComp.user.collectedRecipes.forEach(rid => {
        const request = new Request(`/api/recipes/${rid}`, {
            method: "get",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })
    
        fetch(request)
            .then(res=>{
                if(res.status === 200){
                    return res.json();
                }
            })
            .then(json=>{
                console.log(json)
                myCollectedRecipes.push(json)
            })
            .catch(error=>{
                console.log(error);
            })
        
    });
    viewProfileComp.setState({collectedRecipes: myCollectedRecipes})
}


export const addRecipe = (newRecipeComp) => {
    const newRecipe = {};
    newRecipe.creator = newRecipeComp.state.creator;
    newRecipe.name = newRecipeComp.state.name;
    newRecipe.ingredients = newRecipeComp.state.ingredients;
    newRecipe.steps = newRecipeComp.state.steps;
    newRecipe.description = newRecipeComp.state.description;
    newRecipe.filePath = newRecipeComp.state.filePath;
    newRecipe.categories = newRecipeComp.state.categories;

    console.log("state ready to send a request:");
    console.log(newRecipe);

    const request = new Request("/api/recipes", {
        method: "post",
        body: JSON.stringify(newRecipe),
        headers: {
            Accept: "application/json, text/plain, */*",
            'Content-Type': 'multipart/form-data'
        }
    })

    // send the request with fetch()
    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
            alert("Added A New Recipe!");
        })
        .catch(error=>{
            alert("Could not Add Recipe!");
            console.log(error);
        })
}

export const getRecipe = (comp, rid) => {
    const request = new Request(`/api/recipes/${rid}`, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
            comp.setState({recipe: json})
        })
        .catch(error=>{
            console.log(error);
        })
}

export const getTopRecipes = ()=>{

}

export const updateLikes = ()=>{
    
}
