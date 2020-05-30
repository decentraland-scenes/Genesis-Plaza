@Component("particle")
export class Particle {
  life = Math.random();
  seed = Math.random() - Math.random();
  constructor(public origin: Vector3) {}
}

let fireHeight = 16;

export class ParticleSystem {
  group = engine.getComponentGroup(Particle);
  update(dt: number) {
    if (true) {
      particleShape.visible = true;
      for (const entity of this.group.entities) {
        const particle = entity.getComponent(Particle);
        const transform = entity.getComponent(Transform);
        particle.life -= dt;
        particle.life %= 1;
        transform.position = new Vector3(
          particle.origin.x +
            Math.sin((particle.life - particle.seed) * 5) /
              (1 - particle.life / 1.5) *
              45 * dt,
          particle.origin.y + particle.life * fireHeight,
          particle.origin.z +
            Math.cos((particle.life - particle.seed) * 5) /
              (1 - particle.life / 1.5) *
              45 * dt
        );
        const scale = 0.2 + particle.life / 5;
        transform.scale = new Vector3(scale, scale, scale);
        const rotation = particle.life * 360 + particle.seed * 360;
        transform.rotation = Quaternion.Euler(rotation, rotation, rotation);
      }
    }
  }
}

// Setup particles
const particles: Entity[] = [];
const particleShape = new SphereShape()
const material = new Material()
material.metallic = 1
material.albedoColor = new Color3(4, 2, 0)
material.emissiveColor = new Color3(2, 1.0, 0)
const offset = new Vector3(0, 0, 0);
const MAX_PARTICLES = 384;

// Rocket
export const rocket = new Entity()
rocket.addComponent(new GLTFShape("models/rocket.glb"))
rocket.addComponent(new Transform({
  position: new Vector3(276.414, -75, 263.844),
  rotation: Quaternion.Euler(0, 210, 0),
  scale: new Vector3(1.5, 1.5, 1.5)
}))
engine.addEntity(rocket)

// Initialise particles
for (let i = 0; i < MAX_PARTICLES; i++) {
  const particle = new Entity();
  particle.setParent(rocket);
  particle.addComponent(particleShape);
  particle.addComponent(new Particle(offset));
  particle.addComponent(new Transform({ position: offset }));
  particle.addComponent(material)
  engine.addEntity(particle); 
  particles.push(particle);
}

export class RocketVerticalSystem {
  update(dt: number) {
    if (true) {
      rocket.getComponent(Transform).position.y += dt * 4
    }
  }
}
