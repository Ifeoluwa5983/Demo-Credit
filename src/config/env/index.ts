import development from './development';
import test from './test';

export default {
  development,
  test,
}[process.env.SWITCH_NODE_ENV || 'development'];
