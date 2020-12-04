import axios from "axios";
// modify recipe list of the user
/*
add a new recipe to recipe lists
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
*/
export const addToRecipeList = (uid, recipeList) => {
    // create our request constructor with all the parameters we need
    const request = new Request(`/api/users/${uid}`, {
        method: "post",
        body: JSON.stringify(recipeList),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    console.log(request)
    // send the request with fetch()
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
/*
delete a new recipe to recipe lists
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
*/
export const DeleteFromRecipeList = (uid, recipeList) => {
    // create our request constructor with all the parameters we need
    const request = new Request(`/api/users/${uid}`, {
        method: "delete",
        body: JSON.stringify(recipeList),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
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
        })
        .catch(error=>{
            console.log(error);
        })
}

export const getMyRecipe = (viewProfileComp) => {
    const myRecipes = []
    console.log(viewProfileComp.state.user)
    viewProfileComp.state.user.myRecipes.forEach(rid => {
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
                if(json){
                    console.log(json)
                    myRecipes.push(json)
                }   
            })
            .catch(error=>{
                console.log(error);
            })
        
    });
    viewProfileComp.setState({recipes: myRecipes})  
}

export const getMyCollection = (viewProfileComp) => {
    const myCollectedRecipes = []
    viewProfileComp.state.user.collectedRecipes.forEach(rid => {
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


export const addRecipe = async(newRecipeComp) => {
    const formData = new FormData();   
    formData.append('file', newRecipeComp.state.file);

    try{
        const res = await axios.post('/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const newRecipe = {};
        newRecipe.creatorId = newRecipeComp.state.creatorId;
        newRecipe.creatorUsername = newRecipeComp.state.creatorUsername;
        newRecipe.name = newRecipeComp.state.name;
        if(newRecipeComp.state.description == null){
            newRecipe.description = "none";
        }else{
            newRecipe.description = newRecipeComp.state.description;
        }
        newRecipe.categories = newRecipeComp.state.categories;
        newRecipe.ingredients = newRecipeComp.state.ingredients;
        newRecipe.steps = newRecipeComp.state.steps;
        newRecipe.imageUrl = res.data.imageUrl;
        newRecipe.imageId = res.data.imageId;
        
        const res1 = await axios.post('/api/recipes/', newRecipe);
        console.log(newRecipe)
        alert("The Recipe has been succesfully created!")

        // add to user's my recipe list
        console.log(res1)
        await addToRecipeList(newRecipeComp.props.app.state.currentUser._id, {myRecipes: res1.data._id})
        newRecipeComp.props.history.push("/homepage")
    } catch(error) {
        if(error.res1.status === 500){
            console.log('There was a problem with the server')
        } else{
            console.log(error)
        }
    }
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

// delete recipe list from all users
export const deleteRecipeAllUsers = (rid, deleteComp) => {
    const request = new Request(`/api/users/`, {
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
            json.map(user=>{
                DeleteFromRecipeList(user._id, 
                    {myRecipes: rid, likedRecipes: rid, collectedRecipes: rid}
                )
            })
            return;
        }).then(
            deleteComp.props.history.push("/viewprofile/"+ deleteComp.props.app.state.currentUser._id)
        )
        .catch(error=>{
            console.log(error);
        })

}

export const deleteRecipe = (rid, deleteComp) => {
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
            // delete the recipe from all user's 
                deleteRecipeAllUsers(rid, deleteComp)
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
                if(json.recipes[i].likes >= first_largest){
                    third_largest = second_largest;
                    second_largest = first_largest;
                    first_largest = json.recipes[i].likes;
                    third_idx = second_idx;
                    second_idx = first_idx;
                    first_idx = i;
                }else if(json.recipes[i].likes >= second_largest){
                    third_largest = second_largest;
                    second_largest = json.recipes[i].likes;
                    third_idx = second_idx;
                    second_idx = i;
                }else if(json.recipes[i].likes >= third_largest){
                    third_largest = json.recipes[i].likes;
                    third_idx = i;
                }
            }
            comp.setState({ top3_recipe: [first_idx, second_idx, third_idx]})
        })
        .catch(error=>{
            console.log(error);
        })
}

export const getTop2Recipes = (comp, rid)=>{
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
            comp.setState({ top2_recipes: []})
            // update top 2 recipes
            let first_largest = -1;
            let second_largest = -1;
            let first_recipe = {};
            let second_recipe = {};
            for(let i=0; i< json.recipes.length; i++){
                if(json.recipes[i]._id === rid){
                    continue;
                }else if(json.recipes[i].likes >= first_largest){
                    second_largest = first_largest;
                    first_largest = json.recipes[i].likes;
                    second_recipe = first_recipe;
                    first_recipe = json.recipes[i];
                }else if(json.recipes[i].likes >= second_largest){
                    second_largest = json.recipes[i].likes;
                    second_recipe = json.recipes[i];
                }
            }
            console.log([first_recipe, second_recipe])
            comp.setState({ top2_recipes: [first_recipe, second_recipe]})
        })
        .catch(error=>{
            console.log(error);
        })
}

// set a recipe field 
export const setRecipe = (rid, newRecipe) => {
    axios.patch(`/api/recipes/${rid}`, newRecipe)
    .then(res => console.log(res.data));
}

export const updateRecipe = async(comp, newRecipe) => {
    try {
        if (newRecipe.file){
            const formData = new FormData();   
            formData.append('file', newRecipe.file);
            
            const res0 = await axios.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            newRecipe.imageUrl = res0.data.imageUrl
            newRecipe.imageId = res0.data.imageId
            comp.state.recipe.imageUrl = newRecipe.imageUrl
            comp.state.recipe.imageId = newRecipe.imageId
            
        }
        const res1 = await axios.patch(`/api/recipes/${comp.state.rid}`, newRecipe)
        console.log(res1)
        comp.props.history.push("/viewrecipe/"+ comp.state.rid)
    } catch (error){
        console.log(error)
    }
}