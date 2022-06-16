export type Student = {
  id: string,
  personalNumber: number,
  personName: string,
  sex: 'ж' | 'ч',
  dateBirthday: string,
  leaveInfo: string,
  parentNames: string,
  parentInfo: string,
  contacts: string,
  marks: Marks,
};

export type Marks = Record<string, Mark>

export type Mark = {
  subject: string,
  mark: number | string,
}

type Data = {
  label: string,
  data: number[],
  borderColor: string,
  backgroundColor: string,
};

export type ChartData = {
  labels: string[],
  datasets: Data[],
};

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type Row = Omit<Student, 'id' | 'marks'>;