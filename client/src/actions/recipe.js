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
    const request = new Request("/api/recipes", {
        method: "post",
        body: JSON.stringify(newRecipeComp.state),
        headers: {
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