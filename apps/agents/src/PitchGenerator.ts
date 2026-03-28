import { ToolLoopAgent , Output } from 'ai';
import { z } from 'zod';
import { google } from "@ai-sdk/google"; 
import 'dotenv/config';

const pitch_generator_schema = z.object({
    title: z.string(),
    tagline: z.string(),
    problem: z.string(),
    solution: z.string(),
    targetAudience: z.string(),
    differentiation: z.string(),
    tractionOrPlan: z.string(),
    callToAction: z.string(),
})

export function pitchGeneratorAgent(model:string, use_case:string){
    const pitch_generator_agent = new ToolLoopAgent({
        model:google(`${model}`),
        instructions:`You are a ${use_case} pitch generator. 
        From the user's product, idea, or rough notes, produce a concise pitch deck-style object. 
        Write in clear, investor-friendly language. If details are missing, state reasonable assumptions briefly in tractionOrPlan rather than refusing.
        Writing style:
            - Use clear, simple language
            - Avoid jargon unless necessary
            - Structure information with headers and bullet points
            - Include code examples where relevant
            - Write in second person ("you" instead of "the user")

        Always format responses in Markdown.`,
        output:Output.object({
            schema:pitch_generator_schema,
            name:'pitch_generator',
            description:'A concise pitch deck-style object for the user\'s product, idea, or rough notes.',
        }),
    })

    return pitch_generator_agent

}