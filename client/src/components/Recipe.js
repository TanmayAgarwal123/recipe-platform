import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recipe({ match }) {
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${match.params.id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching the recipe:", error);
      }
    }

    fetchRecipe();
  }, [match.params.id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      {/* Display other recipe details */}
    </div>
  );
}

export default Recipe;
