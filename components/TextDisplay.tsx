import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type TextDisplayProps = {
  defaultText: string;
};

export default function TextDisplay({ defaultText }: TextDisplayProps) {
  return (
    <Card className="min-w-48">
      <CardHeader>
        <CardTitle>Text Display</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">{defaultText}</CardContent>
    </Card>
  );
}
