import { environment } from '../../../environments/environment';
import { ConfigService } from './config.service';
export function ConfigLoader(config: ConfigService) {
  return () => config.load(environment.configFile);
}
