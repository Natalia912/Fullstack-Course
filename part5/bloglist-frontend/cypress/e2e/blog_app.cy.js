describe("Blog app", () => {

  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")

    const user = {
      name: "mark",
      username: "mark jackson",
      password: "user123"
    }

    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000/")
  })

  it("Login form is shown", () => {
    cy.contains("Log in to application")
    cy.contains("username")
  })

  describe("Login",function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("mark jackson")
      cy.get("#password").type("user123")
      cy.get("#login-btn").click()

      cy.contains("mark jackson logged in")
    })

    it("fails with wrong credentials", function() {
      cy.get("#username").type("mark jackson")
      cy.get("#password").type("wrong")
      cy.get("#login-btn").click()

      cy.get("#notification")
        .contains("invalid username or password")
        .should("have.css", "color", "rgb(255, 0, 0)")
      // cy.get("#notification").should("have.css", "color", "red")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "mark jackson", password: "user123"
      }).then(response => {
        localStorage.setItem("user", JSON.stringify(response.body))
        cy.visit("http://localhost:3000")
      })
    })

    it("A blog can be created", function() {
      cy.get(".toggle-open").click()
      cy.get("#title-input").type("blog title")
      cy.get("#author-input").type("blog author")
      cy.get("#url-input").type("blog url")
      cy.get("#submit-btn").click()

      cy.contains("blog title blog author")
    })

    describe("with a blog", function() {
      beforeEach(function () {
        cy.createBlog({
          title: "created title",
          author: "userUSer",
          url: "urlURL"
        })
      })

      it("User can like a blog", function() {
        cy.get(".toggleView").click()
        cy.get(".likeButton").click()

        cy.get(".likes").contains("likes: 1")

      })

      it("The user can delete their blog", function() {
        cy.get(".toggleView").click()
        cy.get(".remove-btn").click()

        cy.get("body").should("not.contain", "created title userUSer")
      })
    })

  })
})