import { fizzBuzz } from "./index.js"
describe('Fizz Buzz Function', () => {
    it('responds with number', async() => {
        const count = 1
        const newCount = fizzBuzz(count)
        expect(newCount).toBe(1);
    })
    it('responds with fizz', async() => {
        const count = 3
        const newCount = fizzBuzz(count)
        expect(newCount).toBe('fizz');
    })
    it('responds with buzz', async() => {
        const count = 10
        const newCount = fizzBuzz(count)
        expect(newCount).toBe('buzz');
    })
    it('responds with fizzbuzz', async() => {
        const count = 15
        const newCount = fizzBuzz(count)
        expect(newCount).toBe('fizzbuzz');
    })
})