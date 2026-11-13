import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const reqConfig = {}

export default function Meals() {
  const { data: meals, err, loading } = useHttp("http://localhost:3000/meals",reqConfig, []);
  if(loading)
    return <p>Loading....</p>
  if(err)
    return <Error title="failed" message={err}/>
  return (
    <section id="meals">
      <ul id="meals">
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
