import consul from "consul";

const consulClient: any = new consul({ host: "localhost", port: 8500 });

interface ServiceInfo {
  Service: string;
  Address: string;
  Port: number;
}

export async function getServiceUrl(serviceName: string): Promise<string> {
  const services: Record<string, ServiceInfo> = await new Promise((resolve, reject) => {
    consulClient.agent.service.list((err: any, result: any) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  const service = Object.values(services).find((s) => s.Service === serviceName) as ServiceInfo | undefined;

  if (!service) throw new Error(`Service ${serviceName} not found`);

  return `http://${service.Address}:${service.Port}`;
}