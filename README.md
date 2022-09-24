# Getting Started

run `npm install` or `yarn` to install the project

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Part two

### What is the difference between Component and PureComponent? give an example where it might break my app.

A Pure Component is a type of component that always returns the same output whereas a Component could be affected by state or props.

### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

I imagine is because there's the risk of having re-render issues or it could produce infinite loops that affect performance of our app.

### Describe 3 ways to pass information from a component to its PARENT.

1 - Through a state management system such as Redux or MobX
2 - Using React Context
3 - By lifting the state up

### Give 2 ways to prevent components from re-rendering.

1 - Using memo to wrap components and making them render only when needed.
2 - Using useRef hook when possible instead of useState.

### What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are some JSX tags that help us wrap the output of our components when we need to display more that one element. In the case of this code challenge, if we need our App.tsx component to render an input and a div with the list of countries, then we need an element to wrap these two elements and using a fragment will not add any additional elements to the DOM, only the elements that it contains.

### Give 3 examples of the HOC pattern.

1 - Amplify provides a withAuth component that wraps the entire app with a HOC which handles authentication, in case user is authenticated it returns the app, in case is not it returns the signUp component.

### what's the difference in handling exceptions in promises, callbacks and async...await.

### How many arguments does setState take and why is it async.

It takes the new state and a callback function. It's async because it has to update the state before executing the callback function.

### List the steps needed to migrate a Class to Function Component.

Not sure about the exact method but I'd create a function to being able to remove the class object, then I'll move the state in the constructor to be handled with useState and finally I'll move all of the component's cycle methods to be handled as side effects with useEffect hooks

### List a few ways styles can be used with components.

1 - With Styled Components
2 - As CSS in JS
3 - With css modules

### How to render an HTML string coming from the server.

I guess if the string comes form an API call, it needs to be converted to a JSON object and then we can use the key containing the HTML to render it in our component
