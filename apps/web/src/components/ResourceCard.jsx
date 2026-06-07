import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function ResourceCard({ title, source, description, link, showBadge }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card border-border/60">
      <CardHeader className="pb-3 flex-grow space-y-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{source}</span>
            <CardTitle className="text-xl font-bold leading-tight">{title}</CardTitle>
          </div>
        </div>
        {showBadge && (
          <Badge variant="secondary" className="w-max bg-primary/10 text-primary-foreground hover:bg-primary/20 border-0">
            Pair with Sums Up
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t border-border/40">
        <Button variant="ghost" className="w-full justify-between hover:bg-muted/50 group" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Read ${title} on ${source}`}>
            <span className="font-medium">Read Article</span>
            <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}