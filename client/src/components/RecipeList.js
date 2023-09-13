import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          {/* Display other recipe details */}
          {/* Link to the recipe details page */}
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
