"""Selected concept dependencies and difficulty, independent from study priority."""
EDGES={
 'javascript--scope':['javascript--variables','javascript--functions'],
 'javascript--closures':['javascript--scope'],
 'javascript--hoisting':['javascript--scope'],
 'javascript--this':['javascript--functions'],
 'javascript--prototypes':['javascript--objects'],
 'javascript--inheritance':['javascript--prototypes'],
 'javascript--classes':['javascript--prototypes','javascript--functions'],
 'javascript--spread-rest':['javascript--objects','javascript--arrays'],
 'javascript--destructuring':['javascript--objects','javascript--arrays'],
 'javascript--iterators':['javascript--functions'],
 'javascript--generators':['javascript--iterators'],
 'javascript--error-handling':['javascript--control-flow'],
 'async--callbacks':['javascript--functions'],
 'async--promises':['async--callbacks'],
 'async--async-await':['async--promises'],
 'async--microtasks':['async--event-loop','async--callbacks'],
 'async--macrotasks':['async--event-loop'],
 'async--fetch':['async--promises','foundations--http-https'],
 'react--props':['react--components'],
 'react--state':['react--components'],
 'react--usestate':['react--state'],
 'react--keys':['react--lists'],
 'react--useeffect':['react--state','async--promises'],
 'react--custom-hooks':['react--hooks'],
 'react--data-fetching':['async--fetch','react--useeffect'],
 'typescript--unions':['typescript--types'],
 'typescript--narrowing':['typescript--unions'],
 'typescript--type-guards':['typescript--narrowing'],
 'nodejs--streams':['nodejs--buffers','async--async-await'],
 'nodejs--eventemitter':['async--callbacks'],
 'security--sessions':['security--cookies'],
 'security--rbac':['security--sessions'],
 'security--csrf':['security--cookies','foundations--http-https']}
BEGINNER={'Fundamentals','Variables','Data types','Operators','Control flow','Functions','Objects','Arrays','Semantic HTML','Forms','Components','JSX','Props','State','Events','useState','Types','Interfaces','Type aliases','Git fundamentals','Branches','JSON','DOM','HTTP/HTTPS'}
ADVANCED={'Garbage collection','Proxy','Reflect','Typed arrays','TC39 proposals','Performance','Worker threads','Cluster','Server/client concepts','Production architecture','Consistency','CAP','Sharding','Replication','CQRS','Event sourcing','Conditional types','Mapped types','Template literal types','Concurrency','Distributed systems'}
def difficulty(area,name):
    if name in ADVANCED:return 'Advanced'
    if name in BEGINNER or area in ['foundations','html','css']:return 'Beginner'
    return 'Intermediate'
