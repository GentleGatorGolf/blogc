
export interface TrajectoryPoint {
  t: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  spin: number;
  cl: number;
  cd: number;
}

export interface TrajectoryResult {
  points: TrajectoryPoint[];
  maxHeight: number;
  carryDistance: number;
  sideCarry: number;
  totalTime: number;
  color: string;
}

function Cd_func(spin_rpm: number): number {
  // Cd increases with spin rate: 0.18 (low spin) to 0.30 (high spin)
  const spin_norm = Math.min(Math.max((spin_rpm - 2000) / 2000, 0), 2);
  return 0.18 + 0.32 * spin_norm; // linear increase with spin
}

function C_lift_func(spin_rpm: number): number {
  // C_lift increases with spin rate, typical range: 0.08 (low spin) to 0.25 (high spin)
  const spin_norm = Math.min(Math.max(spin_rpm / 4000, 0), 2);
  return 0.0001 + 0.00085 * spin_norm; // linear increase with spin
}

type DerivFunc = (state: number[], t: number) => number[];

function rk4_step(f: DerivFunc, y: number[], t: number, dt: number): number[] {
  const k1 = f(y, t);
  const k2 = f(y.map((v, i) => v + 0.5 * dt * k1[i]), t + 0.5 * dt);
  const k3 = f(y.map((v, i) => v + 0.5 * dt * k2[i]), t + 0.5 * dt);
  const k4 = f(y.map((v, i) => v + dt * k3[i]), t + dt);
  return y.map((v, i) => v + (dt / 6.0) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
}

export class GolfBallTrajectory {
  private rho = 1.225;
  private r = 0.02135;
  private A = Math.PI * Math.pow(this.r, 2);
  private m = 0.04593;
  private tau_spin = 8.0;
  private g = 9.81;

  constructor(
    private t_max: number = 10,
    private dt: number = 0.02
  ) {}

  simulate(
    v0_mph: number,
    launch_angle_deg: number,
    azimuth_deg: number,
    back_spin_rpm: number,
    side_spin_rpm: number
  ): TrajectoryResult {
    // Conversions
    const v0 = v0_mph * 0.44704; // mph to m/s
    const theta = (launch_angle_deg * Math.PI) / 180;
    const phi = (azimuth_deg * Math.PI) / 180;

    const vx0 = v0 * Math.cos(theta) * Math.cos(phi);
    const vy0 = v0 * Math.cos(theta) * Math.sin(phi);
    const vz0 = v0 * Math.sin(theta);

    // state: [x, y, z, vx, vy, vz, side_spin_rpm, back_spin_rpm]
    let state = [0, 0, 0, vx0, vy0, vz0, side_spin_rpm, back_spin_rpm];
    const points: TrajectoryPoint[] = [];

    const n_steps = Math.floor(this.t_max / this.dt);

    for (let i = 0; i < n_steps; i++) {
        const [px, py, pz, vx, vy, vz, side_rpm, back_rpm] = state;
        const spin_rpm = Math.sqrt(side_rpm * side_rpm + back_rpm * back_rpm);
        const Cd = Cd_func(spin_rpm);
        const Cl = C_lift_func(spin_rpm);

        points.push({
            t: i * this.dt,
            x: px,
            y: py,
            z: pz,
            vx,
            vy,
            vz,
            spin: spin_rpm,
            cl: Cl,
            cd: Cd
        });

        if (pz <= 0 && i > 0) {
            break;
        }

        state = rk4_step(this._deriv.bind(this), state, i * this.dt, this.dt);
        if (state[2] < 0 && i > 0) {
           // Basic landing interpolation could go here, but pz <= 0 check above handles it simple enough
        }
    }

    const lastPoint = points[points.length - 1];
    
    return {
        points,
        maxHeight: Math.max(...points.map(p => p.z)) * 1.09361, // meters to yards
        carryDistance: Math.sqrt(lastPoint.x * lastPoint.x + lastPoint.y * lastPoint.y) * 1.09361, // meters to yards
        sideCarry: lastPoint.y * 1.09361, // meters to yards
        totalTime: lastPoint.t,
        color: '' // Default empty color
    };
  }

  private _deriv(state: number[], t: number): number[] {
    const [px, py, pz, vx, vy, vz, side_rpm, back_rpm] = state;
    const v = Math.sqrt(vx * vx + vy * vy + vz * vz);
    
    const omega_side = (2 * Math.PI * side_rpm) / 60;
    const omega_back = (2 * Math.PI * back_rpm) / 60;
    const spin_rpm = Math.sqrt(side_rpm * side_rpm + back_rpm * back_rpm);
    
    const Cd = Cd_func(spin_rpm);
    const Cl = C_lift_func(spin_rpm);

    let ax_drag = 0, ay_drag = 0, az_drag = 0;
    if (v > 0) {
        const Fd = 0.5 * this.rho * Cd * this.A * v * v;
        ax_drag = -Fd * vx / (this.m * v);
        ay_drag = -Fd * vy / (this.m * v);
        az_drag = -Fd * vz / (this.m * v);
    }

    const az_magnus = Cl * omega_back * v;
    const ay_magnus = Cl * omega_side * v;

    const ax = ax_drag;
    const ay = ay_drag + ay_magnus;
    const az = az_drag - this.g + az_magnus;

    const domega_side_rpm = -side_rpm / this.tau_spin;
    const domega_back_rpm = -back_rpm / this.tau_spin;

    return [vx, vy, vz, ax, ay, az, domega_side_rpm, domega_back_rpm];
  }
}
