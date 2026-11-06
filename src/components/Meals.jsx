import { useState, useEffect } from "react";
import MealItem from "./MealItem";
export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        //   throw new Error("Something went wrong!");
        //   return;
      }
      const data = await response.json();
      console.log(data);
      setMeals(data);
    }
    fetchMeals();
  }, []);

  return (
    <section id="meals">
      <ul id="meals">
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
      {/* Meals will be displayed here */}
    </section>
  );
}
