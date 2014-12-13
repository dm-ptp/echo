echo_node
=========

echo_node is a node.js service to simply echo query params back as JSON. It's being used to simulate an API endpoint for trial-testing API load testing services and solutions, as well as pre-integrating them into Jenkins, etc.

Use:
```
> node index.js
```

Open <a href="http://localhost:8888/api?k1=v1&k2=v2&k3=v3">http://localhost:8888/api?k1=v1&k2=v2&k3=v3</a> in your browser

You should see the following response page:
```
  {
    "k1": "v1",
    "k2": "v2",
    "k3": "v3"
  }
```

For extra validation the content-type of the response should be text/json, if you'd like to double-check that everything works exactly as you'd expect an API to work.
