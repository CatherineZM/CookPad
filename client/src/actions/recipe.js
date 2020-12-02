import axios from "axios";

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

        axios.post('/api/recipes/', newRecipe);
        console.log(newRecipe)
        newRecipeComp.props.history.push("/homepage");
    } catch(error) {
        if(error.response.status === 500){
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
            console.log("top3 recipes")
            console.log(comp.state.top3_recipe)
        })
        .catch(error=>{
            console.log(error);
        })
}

export const getTopRecipes = () => {

}

// set a recipe field 
export const setRecipe = (rid, newRecipe) => {
    axios.patch(`/api/recipes/${rid}`, newRecipe)
    .then(res => console.log(res.data));
}
