import dynamic from 'next/dynamic';

const ProjectView = dynamic(() => import('@/pages-component/project-view/ProjectView'), {
    ssr: false, // Disable SSR for this component
  });
export default function index() {
    return (
        <ProjectView />

    )
}