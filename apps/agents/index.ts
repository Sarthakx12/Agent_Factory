import { pitchGeneratorAgent } from './src/PitchGenerator';

const { output } = await pitchGeneratorAgent('gemini-2.5-flash','startup').generate({
    prompt:'give me a pitch for a startup that makes a new type of coffee machine that is more efficient and has a longer lifespan',
})

console.log(output);
