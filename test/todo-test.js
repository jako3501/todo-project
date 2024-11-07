import { Selector } from 'testcafe';

fixture('Todo app test')
    .page("https://test.jakobcolmorn.com/todo/");

test('Add a todo', async t => {
    await t
    // Arrange + Act
    .typeText(Selector("#todo-input"), "Test todo")
    .click(Selector(".todo-form button[type='submit']"))

    // Assert
    .expect(Selector("#todo-list").childElementCount).eql(1)

})

test("Deleting a todo", async t => {
    await t
    // Arrange
    .typeText(Selector("#todo-input"), "Test todo")
    .click(Selector(".todo-form button[type='submit']"))
    .typeText(Selector("#todo-input"), "Test todo2")
    .click(Selector(".todo-form button[type='submit']"))

    // Act
    .click(Selector("#removeBtn"))

    // Assert
    .expect(Selector("#todo-list").childElementCount).eql(1)
})

test("Test filter todos", async t => {
    await t
    // Arrange
    .typeText(Selector("#todo-input"), "Test todo")
    .click(Selector(".todo-form button[type='submit']"))

    // Act
    .click(Selector("#filter-completed"))

    // Assert 
    .expect(Selector("#todo-list").childElementCount).eql(0)

    // Act
    .click(Selector("#filter-active"))

    // Assert 
    .expect(Selector("#todo-list").childElementCount).eql(1)

})

test("Test toggle dark mode", async t => {
    await t
    // Arrange + Act
    .click(Selector("#theme-toggle"))

    // Assert
    .expect(Selector("body").hasClass("dark")).ok()

})