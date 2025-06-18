export const getHealthSeverity = (health: string): string => {
  const severityMap: Record<string, string> = {
    Excellent: 'success',
    Good: 'info',
    Fair: 'secondary',
    Poor: 'warn',
    Critical: 'danger'
  }
  return severityMap[health] || ''
}