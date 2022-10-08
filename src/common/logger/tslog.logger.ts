import { Logger as TSLogger, TLogLevelColor } from 'tslog';

const logLevelColors: TLogLevelColor = {
  '0': 'whiteBright',
  '1': 'magentaBright',
  '2': 'cyan',
  '3': 'green',
  '4': 'yellowBright',
  '5': 'red',
  '6': 'bgRedBright',
};

export const logger = new TSLogger({
  instanceName: 'my instance',
  setCallerAsLoggerName: true,
  displayFunctionName: false,
  logLevelsColors: logLevelColors,
});
