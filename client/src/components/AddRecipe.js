import React, { useState } from 'react';
import axios from 'axios';

function AddRecipe() {
  const [title, setTitle] = useState('');
  // ... (similarly define state for other fields)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      // ... (other fields)
    };

    try {
      await axios.post('http://localhost:5000/api/recipes', newRecipe);
      // Redirect to the recipe list or display a success message
    } catch (error) {
      console.error("Error adding the recipe:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* ... (similarly add form fields for other recipe details) */}
      <button type="submit" className="btn btn-primary">Add Recipe</button>
    </form>
  );
}

export default AddRecipe;
