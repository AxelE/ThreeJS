uniform vec3 color;
uniform vec3 light;

varying vec3 vNormal;

void main() {
    //vec3 light = vec3(0.5, 0.2, 1.0);
    //light = normalize(light);

    float dProd = max(0.0, dot(vNormal, normalize(light)));

    gl_FragColor = vec4(dProd*color, 0.5);
}