# Rendering Server Components inside Client Components

Until now, we have learnt that if the parent component is a Client Component, then all the child components are also Client Components. But we can actually render Server Components inside Client Components.

If a component becomes Client Component, then its javascript code is executed on the client side.

To make a child component of a Client Component a Server Component, we need to go to the parent of Client Component where it is being called and pass whatever is being rendered as props or children to the Client Component inside the Server Component (parent).

```js
// /app/services/page.js
import Header from "@/components/Header";
import ServiceItem from "@/components/ServiceItem";
import ServiceList from "@/components/ServiceList";

const Services = () => {
  const services = [
    "Web Development",
    "Mobile App Development",
    "Consulting Services",
    "Digital Marketing",
  ];
  return (
    <>
      <Header />
      <div>
        <h1>Our Services</h1>
        <ServiceList>
          {services.map(service => (
            <ServiceItem key={service} serviceName={service} />
          ))}
        </ServiceList>
      </div>
    </>
  );
};

export default Services;


// /components/ServiceList.js
"use client";

export default function ServiceList({ children }) {
  return (
    <>
      <h3>All Services List</h3>
      <ul className="services-list">{children}</ul>
    </>
  );
}
```

Here, `ServiceItem` is a Server Component and `ServiceList` is a Client Component. Earlier, since it was called in `ServiceList`, it was also a Client Component. But now, it is a Server Component.
