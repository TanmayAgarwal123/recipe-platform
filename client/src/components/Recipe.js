import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation

function Recipe({ match }) {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null); // State to handle errors
  const history = useHistory(); // Hook to navigate programmatically

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${match.params.id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching the recipe:", error);
        setError("Error fetching the recipe."); // Set the error state
      }
    }

    fetchRecipe();
  }, [match.params.id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${match.params.id}`);
      history.push('/'); // Redirect to the recipe list after deletion
    } catch (error) {
      console.error("Error deleting the recipe:", error);
      setError("Error deleting the recipe."); // Set the error state
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p>Author: {recipe.author}</p>
      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}
      <button onClick={handleDelete} className="btn btn-danger">Delete Recipe</button>
      {/* Add a button to navigate to the edit page */}
      <button onClick={() => history.push(`/edit-recipe/${recipe._id}`)} className="btn btn-primary">Edit Recipe</button>
    </div>
  );
}

export default Recipe;
