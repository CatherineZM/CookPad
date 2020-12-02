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
    if(newRecipeComp.state.description == null){
        newRecipe.description = "none";
    }else{
        newRecipe.description = newRecipeComp.state.description;
    }
    newRecipe.categories = newRecipeComp.state.categories;
    newRecipe.ingredients = newRecipeComp.state.ingredients;
    newRecipe.steps = newRecipeComp.state.steps;
    if(newRecipeComp.state.filePath == null){
        newRecipe.filePath = "none";
    }else{
        newRecipe.filePath = newRecipeComp.state.filePath;
    }

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

export const deleteRecipe = (rid) => {
    const request = new Request(`/api/recipes/${rid}`, {
        method: "delete",
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
        })
        .catch(error=>{
            console.log(error);
        })
}

export const getAllRecipes = (comp)=>{
    const request = new Request(`/api/recipes`, {
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
            comp.setState({recipes: json.recipes})
            comp.setState({displayed_recipes: json.recipes})
            
            // update top three recipes
            let first_largest = -1;
            let second_largest = -1;
            let third_largest = -1;
            let first_idx = -1;
            let second_idx = -1;
            let third_idx = -1;
            for(let i=0; i< json.recipes.length; i++){
                if(json.recipes[i].likes > first_largest){
                    third_largest = second_largest;
                    second_largest = first_largest;
                    first_largest = json.recipes[i].likes;
                    first_idx = i;
                }else if(json.recipes[i].likes > second_largest){
                    third_largest = second_largest;
                    second_largest = json.recipes[i].likes;
                    second_idx = i;
                }else if(json.recipes[i].likes > third_largest){
                    third_largest = json.recipes[i].likes;
                    third_idx = i;
                }
            }
            comp.setState({ top3_recipe: [first_idx, second_idx, third_idx]})
            console.log(comp.state.top3_recipe)
        })
        .catch(error=>{
            console.log(error);
        })
}

export const getTopRecipes = ()=>{

}

export const updateLikes = ()=>{

}
