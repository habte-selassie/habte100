// Step 1: Data Collection

// For demonstration purposes, let's assume we're using the Spoonacular API to fetch recipe data

const fetchRecipeData = async ()=>{

    try {
        const response = await fetch('https://api.spoonacular.com/recipes/random?number=10&apiKey=YOUR_API_KEY')
        const data = await response.json();
        // Assuming 'recipes' is an array of recipe objects
   
        return data.recipes;

        
    } catch (error) {
       console.error("Error Fetch recipe data",error);
       return null; 
    }
}

// Step 2: Data Preprocessing

const preprocessData = (recipes) => {
    // Iterate through each recipe
    recipes.forEach(recipe => {
        // Handle missing values (if any)
        if (!recipe.ingredients) {
            recipe.ingredients = []; // Set ingredients to an empty array if missing
        }
        if (!recipe.instructions) {
            recipe.instructions = ''; // Set instructions to an empty string if missing
        }

        if(!recipe.categories) {
            recipe.categories = '' // Set categories to an empty string if missing
        }

        if(!recipe.cusine) {
            recipe.cusine = '' // Set cusine to an empty string if missing
        }
        

        // Standardize formats (if needed)
        // For example, convert all ingredients to lowercase
        recipe.ingredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase());
        
        // Additional preprocessing steps can be added as needed
    });
    
    return recipes; // Return the preprocessed data
};


// Step 3: Feature Engineering

const extractFeatures = (recipes) => {
    // Iterate through each recipe
    recipes.forEach(recipe => {
        // Extract features for each recipe
        
        // Example: Extract ingredient vectors
        const ingredientVector = extractIngredients(recipe.ingredients);
        recipe.ingredientVector = ingredientVector;
        
        // Example: Extract recipe mealType
        const mealType = extractMealTypes(recipe);
        recipe.mealType = mealType;

        // Example: Extract recipe cusine
        const cusine = extractCusines(recipe);
        recipe.cusine = cusine;

        // Example: Extract recipe DietaryRestrictions
        const DietaryRestrictions = extractDietaryRestrictions(recipe);
        recipe.DietaryRestrictions = DietaryRestrictions;
        
        // Additional feature extraction logic can be added as needed
    });
    
    return recipes; // Return the data with extracted features
};

// Function to extract recipe cuisine
const extractCusines = (recipe)=>{
    // Analyze keywords in recipe titles or descriptions to determine cuisine
    const keywords = ['Italian','Mexican','Chinese','Indian','French'];
    const title = recipe.title.toLowerCase();
    const description = recipe.description.toLowerCase();
    
    // Check if any of the keywords are present in the title or description
    const foundKeyWords = keywords.filter(keyword => title.includes(keyword) || description.includes(keyword) );
     // If any keyword is found, return the first one
     if(foundKeyWords.length > 0) {
        return foundKeyWords[0];
     }

    // If no keyword is found, return a default value or null
    return null;

} 

// Function to extract meal types
const extractMealTypes = (recipe) => {
    // Analyze keywords in recipe titles or descriptions to determine meal types
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    const title = recipe.title.toLowerCase();
    const description = recipe.description.toLowerCase();
    
    // Check if any of the meal types keywords are present in the title or description
    const foundMealTypes = mealTypes.filter(type => title.includes(type.toLowerCase()) || description.includes(type.toLowerCase()));
    
    // Return the list of meal types found in the recipe
    return foundMealTypes;
};


// Function to extract recipe dietary restrictions
const extractDietaryRestrictions = (recipe) => {
    // Analyze keywords in recipe titles or descriptions to determine dietary restrictions
    const keywords = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free']; // Example keywords
    const title = recipe.title.toLowerCase();
    const description = recipe.description.toLowerCase();

    // Check if any of the keywords are present in the title or description
    const foundKeywords = keywords.filter(keyword => title.includes(keyword) || description.includes(keyword));

    // Return the list of found dietary restrictions
    return foundKeywords;
};

// Function to extract ingredients from a recipe
const extractIngredients = (recipe) => {
    // Assuming the ingredients are stored in an array property named 'ingredients'
    const ingredients = recipe.ingredients;
    return ingredients;
};



// Step 4: Model Selection (Hybrid Recommender System)

// Collaborative Filtering Logic
const collaborativeFilteringRecommendation = (userId, userPreferences) => {
   
    // Example user-item interaction data
const userItemInteractions = [
    { userId: 'user1', recipeId: 'recipe1', rating: 5 },
    { userId: 'user1', recipeId: 'recipe2', rating: 4 },
    { userId: 'user2', recipeId: 'recipe1', rating: 3 },
    { userId: 'user2', recipeId: 'recipe3', rating: 5 },
    // Additional user-item interactions
];

const CollaborativeFiltering = {
    // Collaborative Filtering Recommendation Logic
    collaborativeFilteringRecommendation: (userId, userPreferences) => {
        // Get all recipes interacted with by the target user
        const userInteractedRecipes = userItemInteractions
            .filter(interaction => interaction.userId === userId)
            .map(interaction => interaction.recipeId);

        // Find similar users based on their interactions with recipes
        const similarUsers = userItemInteractions
            .filter(interaction => userInteractedRecipes.includes(interaction.recipeId) && interaction.userId !== userId)
            .reduce((acc, interaction) => {
                if (!acc[interaction.userId]) {
                    acc[interaction.userId] = 1;
                } else {
                    acc[interaction.userId]++;
                }
                return acc;
            }, {});

        // Sort similar users by the number of common interactions
        const sortedSimilarUsers = Object.entries(similarUsers)
            .sort((a, b) => b[1] - a[1])
            .map(([userId]) => userId);

        // Get top recommended recipes from similar users
        const recommendedRecipes = userItemInteractions
            .filter(interaction => sortedSimilarUsers.includes(interaction.userId) && !userInteractedRecipes.includes(interaction.recipeId))
            .map(interaction => interaction.recipeId)
            .slice(0, 3); // Limit recommendations to 3 recipes for simplicity

        return recommendedRecipes;
    }
};

// Example usage:

(async () => {
    // Assuming user preferences are available
    const userId = 'user1'; // Target user
    const recommendations = CollaborativeFiltering.collaborativeFilteringRecommendation(userId);
    console.log('Collaborative Filtering Recommendations:', recommendations);
})();

    return ['Recipe 1', 'Recipe 2', 'Recipe 3']; // Placeholder recommendations
};

// Content-Based Filtering Logic
const contentBasedFilteringRecommendation = (userPreferences) => {
    
    // Example recipe data
const recipeData = [
    { recipeId: 'recipe1', title: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'bacon', 'parmesan cheese'], category: 'Italian' },
    { recipeId: 'recipe2', title: 'Chicken Curry', ingredients: ['chicken', 'curry powder', 'coconut milk', 'rice'], category: 'Indian' },
    { recipeId: 'recipe3', title: 'Caprese Salad', ingredients: ['tomatoes', 'mozzarella cheese', 'basil', 'olive oil'], category: 'Italian' },
    // Additional recipe data
];

const ContentBasedFiltering = {
    // Content-Based Filtering Recommendation Logic
    contentBasedFilteringRecommendation: (userPreferences) => {
        // Filter recipes based on user preferences (e.g., cuisine, meal type)
        const filteredRecipes = recipeData.filter(recipe => {
            // Check if recipe matches user preferences
            let matchesPreferences = true;
            if (userPreferences.cuisine && recipe.category.toLowerCase() !== userPreferences.cuisine.toLowerCase()) {
                matchesPreferences = false;
            }
            // Additional preference matching logic can be added here

            return matchesPreferences;
        });

        // Sort filtered recipes by relevance or popularity
        const sortedRecipes = filteredRecipes.slice().sort((a, b) => {
            // Example: Sort by the number of ingredients matching user preferences
            const numMatchingIngredientsA = a.ingredients.filter(ingredient => userPreferences.ingredients.includes(ingredient)).length;
            const numMatchingIngredientsB = b.ingredients.filter(ingredient => userPreferences.ingredients.includes(ingredient)).length;

            return numMatchingIngredientsB - numMatchingIngredientsA;
        });

        // Return top recommended recipes (limit to 3 for simplicity)
        const recommendedRecipes = sortedRecipes.slice(0, 3).map(recipe => recipe.recipeId);
        return recommendedRecipes;
    }
};

// Example usage:

(async () => {
    // Assuming user preferences are available
    const userPreferences = {
        cuisine: 'Italian',
        // Additional user preferences (e.g., ingredients, meal type)
    };

    const recommendations = ContentBasedFiltering.contentBasedFilteringRecommendation(userPreferences);
    console.log('Content-Based Filtering Recommendations:', recommendations);
})();

    return ['Recipe 4', 'Recipe 5', 'Recipe 6']; // Placeholder recommendations
};

// Hybrid Recommender System combining collaborative filtering and content-based filtering
const HybridRecommender = {
    // Hybrid Recommendation
    recommendRecipes: (userId, userPreferences) => {
        // Get recommendations from collaborative filtering
        const collaborativeRecommendations = collaborativeFilteringRecommendation(userId, userPreferences);
        
        // Get recommendations from content-based filtering
        const contentBasedRecommendations = contentBasedFilteringRecommendation(userPreferences);
        
        // Combine and deduplicate recommendations
        const hybridRecommendations = [...new Set([...collaborativeRecommendations, ...contentBasedRecommendations])];
        
        return hybridRecommendations;
    }
};

// Example usage:

(async () => {
    // Assuming user preferences are available
    const userPreferences = {
        cuisine: 'Italian',
        mealType: 'Dinner',
        // Additional user preferences
    };

    // Get hybrid recommendations for a specific user
    const userId = 'user123';
    const recommendations = HybridRecommender.recommendRecipes(userId, userPreferences);
    console.log('Hybrid Recommendations:', recommendations);
})();


// Collaborative Filtering (SVD-based Matrix Factorization)
function trainCollaborativeFiltering(userItemMatrix, numFactors) {
    // Train the collaborative filtering model using Singular Value Decomposition (SVD)
    // This example uses a basic SVD implementation for demonstration purposes
    // In practice, you might use a library like svd-js or implement a more sophisticated method
    // Assume userItemMatrix is a 2D array where rows represent users, columns represent items, and values represent ratings

    // Perform Singular Value Decomposition
    const svdResult = performSVD(userItemMatrix, numFactors);

    // Return the learned user and item latent factor matrices
    return {
        userLatentFactors: svdResult.U,
        itemLatentFactors: svdResult.V,
    };
}

// Content-Based Filtering (Cosine Similarity)
function trainContentBasedFiltering(itemFeatureMatrix) {
    // Train the content-based filtering model using cosine similarity
    // This example assumes itemFeatureMatrix is a 2D array where rows represent items and columns represent features

    // Compute item-item similarity matrix using cosine similarity
    const similarityMatrix = computeCosineSimilarity(itemFeatureMatrix);

    // Return the learned item-item similarity matrix
    return similarityMatrix;
}

// Hybrid Recommender System
function trainHybridModel(userItemMatrix, itemFeatureMatrix, numFactors) {
    // Train the hybrid recommendation model by combining collaborative filtering and content-based filtering

    // Train collaborative filtering model
    const collaborativeModel = trainCollaborativeFiltering(userItemMatrix, numFactors);

    // Train content-based filtering model
    const contentBasedModel = trainContentBasedFiltering(itemFeatureMatrix);

    // Return the trained collaborative and content-based models
    return {
        collaborativeModel,
        contentBasedModel,
    };
}

// Example usage:
const userItemMatrix = [
    [5, 4, 0, 0, 3],
    [0, 0, 4, 0, 0],
    [4, 0, 0, 0, 0],
    [0, 0, 0, 3, 4],
    [0, 0, 0, 0, 0],
];

const itemFeatureMatrix = [
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
    [0, 1, 0],
    [1, 0, 0],
];

const numFactors = 3;

// Train the hybrid recommendation model
const hybridModel = trainHybridModel(userItemMatrix, itemFeatureMatrix, numFactors);

// The hybrid model is now trained and ready to use for recommendations

