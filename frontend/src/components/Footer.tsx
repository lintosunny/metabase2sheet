export const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4 bg-background">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground font-normal">
          © metabase<span className="font-semibold text-primary">2</span>sheet | Built by{" "}
          <a
            href="https://github.com/lintosunny/metabase2sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary font-medium transition-colors"
          >
            Linto N S
          </a>
          {" "}| Contact:{" "}
          <a href="mailto:lintosunny111@gmail.com" className="text-foreground hover:text-primary font-medium transition-colors">
            lintosunny111@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};
