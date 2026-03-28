import { ToolLoopAgent ,Output ,tool } from 'ai';
import { z } from 'zod';


const get_current_weather_tool = tool({
    description:'Get the current weather for a given location',
    inputSchema:z.object({
        location:z.string(),
    }),
    execute:async({location})=>{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}`);
        const data = await response.json();
        return data;
    },
})

export function weatherAgent(model:string){
    const weather_agent = new ToolLoopAgent({
        model:`${model}`,
        instructions:`You are a weather assistant. When the user asks about current conditions or forecasts for a place, call getCurrentWeather with a clear location string. Summarize results in natural language with temperature (°C), humidity, and wind. If geocoding fails, ask for a more specific location. Do not invent weather data.`,
        tools:{
            getCurrentWeather:get_current_weather_tool,
        },
        output:Output.object({
            schema:z.object({
                weather:z.string(),
                temperature:z.number(),
                humidity:z.number(),
                wind:z.number(),
            }),
            name:'weather',
            description:'The current weather for the given location.',
        }),
    })
    
    return weather_agent;
}