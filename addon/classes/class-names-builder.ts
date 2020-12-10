import ClassNamesDriver from '../classes/class-names-driver';

type ClassNamesBuilder = {
  (element: string, ...elementArgs: (string | object)[]): ClassNamesDriver;
  toString(formatter?: (driver: ClassNamesDriver) => string): string;
};

export default ClassNamesBuilder
