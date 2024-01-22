"""
Load Gapminder Dataset Using Pandas and Explore Insights With Plotly
-------------------------------------------------------------------
This script shows how to load the Gapminder dataset using Pandas and exploring captivating insights about various countries by employing the power of Pandas and Plotly libraries.
"""

# Import required libraries
import pandas as pd  # Data manipulation library
import plotly  # Visualization library
import plotly.express as px  # High-level interface for data visualization built upon Plotly
import plotly.graph_objects as go  # Low-level interface for creating advanced graphics using Plotly

# Load Gapminder dataset
# Documentation: https://plotly.com/python/built-in-datasets/#gapminder-dataset
df = px.data.gapminder()
print("\nGapminder dataset shape:", df.shape)  # Output: Gapminder dataset shape: (1704, 6)

# Display first five records of the loaded dataset
print("\nFirst five records:\n", df.head())

# Example insight extraction and visualization using the loaded dataset
# Calculate life expectancy median per continent
life_expectancy_median_per_continent = df.groupby("continent")["lifeExp"].median().reset_index()

# Generate bar chart for visualizing life expectancy medians across continents
fig = go.Figure(data=[go.Bar(x=life_expectancy_median_per_continent["continent"], y=life_expectancy_median_per_continent["lifeExp"])])
fig.update_layout(title="Life Expectancy Median Across Continents", xaxis_title="Continent", yaxis_title="Median Life Expectancy")
fig.show()

# Another example of generating scatter plots comparing two variables
fig = px.scatter(df, x="gdpPercap", y="lifeExp", color="continent", size="pop", hover_name="country")
fig.update_layout(title="Scatter Plot Comparing GDP Per Capita vs Life Expectancy by Continent", xaxis_title="GDP Per Capita ($)", yaxis_title="Life Expectancy (years)", legend_title="Continent")
fig.show()