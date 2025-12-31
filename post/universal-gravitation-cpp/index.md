<h1 class="title">Universal gravitation in C++</h1>
<h2 class="subtitle"></h2>
<span class="date">2012-07-15</span>

With all the cool science thats been going around I decided that it would be fun to take some of the things I remember from High School physics and turn it into code. I decided to write a class that calculates the force between two objects using [Universal Gravitation](http://en.wikipedia.org/wiki/Newton's_law_of_universal_gravitation):

$$F = G \frac{m_1 m_2}{r^2}$$

We start by creating a body with the properties of an object in space, I used x,y,z coordinates because I intend on using 3d rendering some time in the future, also, I will use these coordinates to calculate the distance between the centers of the two objects later. We will also declare a constructor and a function to calculate the force between the current instance object and a passed object.

This is the end result, MassObject.h:

```cpp
#ifndef MassObject_h
#define MassObject_h

class MassObject{
public:
    float x,y,z;
    /*get the gravitational pull between this
    object and another object*/
    float gravitationalForce(MassObject otherObject);
    MassObject(float x,float y,float z ,float mass);
private:
    /*mass is private because external objects should not
    be able to modify an objects mass*/
    float mass; //mass in kg
};

#endif
```

Now for the implementation, the constructor is pretty straight forward, so I don't feel the need to explain myself there. The part we are focused on is the calculation of the force between the two objects. For the calculation we require the distance between the objects, this can be obtained using the theorem of Pythagoras on the current object and the object passed to the gravitationalForce() function.

Usually we would use sqrt() to find the square root to get the hypotenuse. However if we take a look at the formula for universal gravitation we see that it requires the distance squared, it would be a waste of CPU time to calculate the square root of something only to square it again, so instead we will calculate for r squared, this will also let us avoid having to #include cmath.h.

MassObject.cpp:

```cpp
#include "MassObject.h"

const float G  = 6.67300E-11;

MassObject::MassObject(float x,float y,float z,float mass){
    this->x = x;
    this->y = y;
    this->z = z;
    this->mass = mass;
}

float MassObject::gravitationalForce(MassObject otherObject){
    /*F = G m1*m2 / r^2
    G = gravitational constant | G = 6.67300 × 10^−11
    m1 = mass 1 (kg)
    m2 = mass 2 (kg)
    r = distance between the centers of the masses*/

    //find the distance between the x y and z pairs
    float x_dist = this->x - otherObject.x;
    float y_dist = this->y - otherObject.y;
    float z_dist = this->z - otherObject.z;

    //calculate the distance between the two objects r^2 = x^2 + y^2 + z^2
    float r_Squared = ((x_dist*x_dist) + (y_dist*y_dist) + (z_dist*z_dist));

    return G * (((this->mass) * otherObject.mass) / r_Squared); //return force in newtons
}
```

So there is our MassObject class for calculating the force between two bodies, but we should test it to see if everything is working alright. The best way to do this, is to do the "Earth Test". We know that gravity on earth is roughly 9.8N, so if we did our calculation for an object with the weight of 1kg on the surface of the earth the result should be roughly 9.8. Keep in mind that the mass of the earth is roughly 5.9722e24Kg and its radius roughly 6378.1e3 m. Lets test this in our main function to see if the calculations work properly.

To keep things as compact as possible, I stuck both the earth and the 1Kg object into an array of MassObjects.

main.cpp:

```cpp
#include <iostream>
#include "MassObject.h"

int main(int argc, const char * argv[])
{
    MassObject *mo[] = {
        new MassObject(0.0f, 0.0f, 0.0f, 5.9722e+24f),
        new MassObject(6378.1e3f, 0.0f, 0.0f, 1.0f)
    };

    float F = mo[0]->gravitationalForce(*mo[1]);
    std::cout << "Force: " << F << std::endl;

    return 0;
}
```

I get the following output:

**Force: 9.79654**

And I think thats close enough to 9.8 to call it a success.

---

*Originally posted on [Blogspot](https://divcode.blogspot.com/2012/07/universal-gravitation-in-c.html)*
