import axios from 'axios';

const CONSUL_URL = 'http://172.20.166.66:8500';

export async function getServiceUrl(serviceName: string): Promise<string> {
  const response = await axios.get(`${CONSUL_URL}/v1/agent/services`);
  const services = response.data;
  
  const serviceEntry = Object.values(services).find(
    (s: any) => s.Service === serviceName
  );
  
  if (!serviceEntry) throw new Error(`Service ${serviceName} not found`);
  
  return `http://${(serviceEntry as any).Address}:${(serviceEntry as any).Port}`;
}