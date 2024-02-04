export type Page = {
  params: {
    slug?: string;
    id?: string;
  };
  searchParams: { [key: string]: string | undefined }; //| string[]
};
