import fizzBuzz from "./FizzBuzz"
describe('Fizz Buzz Function', () => {
    it('responds with number ', async() => {
        const count = 1
        const newCount = fizzBuzz(count)
        expect(newCount).toBe(2);
    })
})