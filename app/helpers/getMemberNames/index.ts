type MemberRow = {
  name: string;
};

export const getMemberNames = (membersList: MemberRow[] | null | undefined) => {
  return [...new Set((membersList ?? []).map(({ name }) => name))].sort((a, b) =>
    a.localeCompare(b),
  );
};
