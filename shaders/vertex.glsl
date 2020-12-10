attribute vec4 aPosition;
attribute vec4 aColor;
attribute vec4 aNormal;

uniform mat4 uMVPMatrix;
uniform vec3 theta;

uniform mat4 uTranslationMatrix;
uniform mat4 uScaleMatrix;

uniform vec4 lightPosition;
uniform vec4 lightPosition1;

varying vec4 vColor;

vec4 ambientProduct; // 1 for the scene

// for first light source
vec4 diffuseProduct0, specularProduct0;
float shininess0;
vec4 diffuseProduct1, specularProduct1;
float shininess1;

// for second light source
vec4 diffuseProduct2, specularProduct2;
float shininess2;
vec4 diffuseProduct3, specularProduct3;
float shininess3;

void main() {

    ambientProduct = vec4(0.1, 0.1, 0.1, 1.0);

    // 1
    diffuseProduct0 = vec4(1.0, 1.0, 1.0, 1.0);
    specularProduct0 = vec4(1.0, 0.0, 0.0, 1.0);
    shininess0 = 7.0;
    // 1
    diffuseProduct1 = vec4(1.0, 0.0, 0.0, 1.0);
    specularProduct1 = vec4(0.0, 0.0, 1.0, 1.0);
    shininess1 = 7.0;

    // 2
    diffuseProduct2 = vec4(1.0, 0.0, 0.0, 1.0);
    specularProduct2 = vec4(0.0, 0.0, 1.0, 1.0);
    shininess2 = 7.0;
    // 2
    diffuseProduct3 = vec4(1.0, 0.0, 0.0, 1.0);
    specularProduct3 = vec4(0.0, 0.0, 1.0, 1.0);
    shininess3 = 7.0;

    vec3 angles = radians(theta);
    vec3 c = cos(angles);
    vec3 s = sin(angles);

    mat4 rx = mat4(1.0, 0.0, 0.0, 0.0,
    0.0, c.x, s.x, 0.0,
    0.0, -s.x, c.x, 0.0,
    0.0, 0.0, 0.0, 1.0);

    mat4 ry = mat4(c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0);

    mat4 rz = mat4(c.z, s.z, 0.0, 0.0,
    -s.z, c.z, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0);

    // first
    vec3 vertexPos = (uTranslationMatrix * rz * ry * rx * uScaleMatrix * aPosition).xyz;
    vec3 lightPos = lightPosition.xyz;
    vec3 lightVector = normalize(lightPos - vertexPos);
    vec3 normalVector = normalize((uTranslationMatrix * rz * ry * rx * uScaleMatrix * aNormal).xyz);

    // 1
    float distance0 = length(lightPos - vertexPos);
    float diffuseValue0 = max(dot(lightVector, normalVector), 0.0) / distance0;
    float specularValue0 = pow(diffuseValue0, shininess0);

    // 1
    float distance1 = length(lightPos - vertexPos);
    float diffuseValue1 = max(dot(lightVector, normalVector), 0.0) / distance1;
    float specularValue1 = pow(diffuseValue1, shininess1);

    // second
    vec3 vertexPos1 = (uTranslationMatrix * rz * ry * rx * uScaleMatrix * aPosition).xyz;
    vec3 lightPos1 = lightPosition1.xyz;
    vec3 lightVector1 = normalize(lightPos1 - vertexPos1);
    vec3 normalVector1 = normalize((uTranslationMatrix * rz * ry * rx * uScaleMatrix * aNormal).xyz);

    // 2
    float distance2 = length(lightPos1 - vertexPos1);
    float diffuseValue2 = max(dot(lightVector1, normalVector1), 0.0) / distance2;
    float specularValue2 = pow(diffuseValue2, shininess2);

    // 2
    float distance3 = length(lightPos1 - vertexPos1);
    float diffuseValue3 = max(dot(lightVector1, normalVector1), 0.0) / distance3;
    float specularValue3 = pow(diffuseValue3, shininess3);

    vColor = ( aColor * 0.1 ) + ambientProduct + (diffuseProduct0 * diffuseValue0) + (specularProduct0 * specularValue0) + (diffuseProduct1 * diffuseValue1) + (specularProduct1 * specularValue1) +
    (diffuseProduct2 * diffuseValue2) + (specularProduct2 * specularValue2) + (diffuseProduct3 * diffuseValue3) + (specularProduct3 * specularValue3);

    gl_Position = uTranslationMatrix * uMVPMatrix * rz * ry * rx * uScaleMatrix * aPosition;

}
