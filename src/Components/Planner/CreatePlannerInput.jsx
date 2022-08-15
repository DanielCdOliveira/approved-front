export default function CreatePlannerInput({ subject, folderId, setOption }) {
  return (
    <>
      {subject.topics.map((topic) => {
        return (
          <option value={`${folderId} ${subject.id} ${topic.id}`}>
            {subject.name} - {topic.name}
          </option>
        );
      })}
    </>
  );
}
