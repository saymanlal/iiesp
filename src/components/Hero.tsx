import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BookOpen, Users } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-glow">
            <span className="text-gradient">IIESP</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A unified hub for certifications and diplomas
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Elevate your career with industry-recognized certifications. Learn from experts, 
            earn credentials, and stand out in your field.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Explore Courses
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 animate-fade-in">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certified Programs</h3>
            <p className="text-muted-foreground">
              Industry-recognized certifications that boost your career
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:border-secondary transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <BookOpen className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-muted-foreground">
              Learn from professionals with real-world experience
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-muted-foreground">
              Join thousands of learners advancing their careers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
